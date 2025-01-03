import { useState, useEffect } from "react";
import {
  LayoutGrid,
  List,
  LayoutList,
  X,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  MessageSquare,
} from "lucide-react";
import {
  createPost,
  getPosts,
  getPostById,
  createComment,
  getComments,
  upvotePost,
  downvotePost,
  savePost,
} from "../../services/posts";

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Existing state...
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [userVotes, setUserVotes] = useState({});
  const [savedPosts, setSavedPosts] = useState(new Set());
  const [voteLoading, setVoteLoading] = useState({});
  const [postVotesCounts, setPostVotesCounts] = useState({});
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
  });
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingPost, setIsLoadingPost] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [viewType, setViewType] = useState("grid"); // 'grid', 'list', or 'compact'

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);

      // Initialize vote counts
      const initialVoteCounts = {};
      fetchedPosts.forEach((post) => {
        initialVoteCounts[post.id] = post.votes || 0;
      });
      setPostVotesCounts(initialVoteCounts);
    } catch (err) {
      setError("Failed to fetch posts");
      console.error("Error fetching posts:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const createdPost = await createPost({
        title: newPost.title,
        content: newPost.content,
        userId: JSON.parse(localStorage.getItem("user")).id,
      });
      setPosts((prevPosts) => [createdPost, ...prevPosts]);
      setIsNewPostModalOpen(false);
      setNewPost({ title: "", content: "" });
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add getVoteButtonStyles function
  const getVoteButtonStyles = (type, currentVote) => `
    p-1 rounded-full transition-colors
    ${
      type === currentVote
        ? "text-[#078BFE]"
        : "text-gray-500 hover:text-[#078BFE] hover:bg-gray-100"
    }
  `;

  // Add handlePostVote function
  const handlePostVote = (isUpvote, postId) => {
    const voteType = isUpvote ? "up" : "down";

    setPostVotesCounts((prev) => ({
      ...prev,
      [postId]:
        prev[postId] +
        (userVotes.posts[postId] === voteType
          ? -1 // Removing vote
          : userVotes.posts[postId] === null || !userVotes.posts[postId]
          ? isUpvote
            ? 1
            : -1 // New vote
          : isUpvote
          ? 2
          : -2), // Changing vote direction
    }));

    setUserVotes((prev) => ({
      ...prev,
      posts: {
        ...prev.posts,
        [postId]: prev.posts[postId] === voteType ? null : voteType,
      },
    }));
  };

  const handlePostClick = async (postId) => {
    try {
      setIsLoadingPost(true);
      const post = await getPostById(postId);
      setSelectedPost(post);
      setIsPostModalOpen(true);
      fetchComments(postId);
    } catch (error) {
      console.error("Failed to fetch post details:", error);
    } finally {
      setIsLoadingPost(false);
    }
  };

  const fetchComments = async (postId) => {
    try {
      setIsLoadingComments(true);
      const fetchedComments = await getComments(postId);
      setComments(fetchedComments);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setIsLoadingComments(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmittingComment(true);
    try {
      const comment = await createComment(selectedPost._id, {
        content: newComment,
        userId: selectedPost.userId._id,
      });
      setComments((prev) => [...prev, comment]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to create comment:", error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  // Add view type styles
  const getPostContainerStyles = () => {
    switch (viewType) {
      case "grid":
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
      case "list":
        return "space-y-4";
      case "compact":
        return "space-y-2";
      default:
        return "space-y-4";
    }
  };

  const getPostCardStyles = () => {
    switch (viewType) {
      case "grid":
        return "bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow";
      case "list":
        return "bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow";
      case "compact":
        return "bg-white rounded-lg p-2 shadow hover:shadow-md transition-shadow";
      default:
        return "bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow";
    }
  };

  const handleVote = async (postId, isUpvote) => {
    try {
      setVoteLoading((prev) => ({ ...prev, [postId]: true }));

      const voteFunction = isUpvote ? upvotePost : downvotePost;
      const updatedPost = await voteFunction(postId);

      setPosts(
        posts.map((post) =>
          post._id === postId ? { ...post, votes: updatedPost.votes } : post
        )
      );

      setUserVotes((prev) => ({
        ...prev,
        [postId]: isUpvote ? "up" : "down",
      }));
    } catch (error) {
      console.error("Failed to vote:", error);
    } finally {
      setVoteLoading((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const handleSave = async (e, postId) => {
    e.stopPropagation();
    try {
      await savePost(postId);
      setSavedPosts((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(postId)) {
          newSet.delete(postId);
        } else {
          newSet.add(postId);
        }
        return newSet;
      });
    } catch (error) {
      console.error("Failed to save post:", error);
    }
  };

  // Replace example posts section with:
  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-grow">
          <h1 className="text-2xl font-bold">
            👋🏻 Welcome back {JSON.parse(localStorage.getItem("user")).name}!
          </h1>
          <p className="text-gray-600">
            Find answers for your Questions, and help others.
          </p>
        </div>
        <button
          onClick={() => setIsNewPostModalOpen(true)}
          className="px-4 py-2 text-[#078BFE] hover:bg-[#078BFE]/10 rounded-lg flex items-center gap-2"
        >
          <span>+</span> New Post
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Reputation Card */}
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Reputation</h3>
            <span className="text-gray-400">↓</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">2</span>
            <span className="text-sm text-gray-500">
              Earn reputation by{" "}
              <a href="#" className="text-[#078BFE]">
                Helping others.
              </a>
            </span>
          </div>
        </div>

        {/* Last Course Progress Card */}
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Last Course Progress</h3>
            <span className="text-gray-400">⊞</span>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>50</span>
              <span className="text-gray-500">/100 Lessons</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-[#078BFE] h-2 rounded-full w-1/2"></div>
            </div>
          </div>
        </div>

        {/* Watched Tags Card */}
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Watched tags</h3>
            <span className="text-gray-400">⊕</span>
          </div>
          <p className="text-gray-500">You're not watching Tags yet!</p>
        </div>
      </div>

      {/* Posts Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">
          Interesting posts for you
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Based on your interests, viewing history and watched tags.
        </p>

        {/* View Options */}
        <div className="flex justify-end gap-2 mb-4">
          <button
            onClick={() => setViewType("list")}
            className={`p-2 rounded-lg transition-colors ${
              viewType === "list"
                ? "bg-[#078BFE] text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <List className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewType("grid")}
            className={`p-2 rounded-lg transition-colors ${
              viewType === "grid"
                ? "bg-[#078BFE] text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewType("compact")}
            className={`p-2 rounded-lg transition-colors ${
              viewType === "compact"
                ? "bg-[#078BFE] text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <LayoutList className="w-5 h-5" />
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#078BFE] mx-auto"></div>
          </div>
        )}

        {/* Error State */}
        {error && <div className="text-center py-8 text-red-500">{error}</div>}

        {/* Posts List */}
        <div className={getPostContainerStyles()}>
          {!isLoading &&
            !error &&
            posts.map((post) => (
              <div
                key={post._id}
                className={`${getPostCardStyles()} cursor-pointer`}
                onClick={() => handlePostClick(post._id)}
              >
                <div
                  className={`flex items-start gap-3 ${
                    viewType === "compact" ? "text-sm" : ""
                  }`}
                >
                  {viewType !== "compact" && (
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      {post.userId?.name?.charAt(0) || "A"}
                    </div>
                  )}
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3
                          className={`font-semibold ${
                            viewType === "compact" ? "text-sm" : ""
                          }`}
                        >
                          {post.userId?.name || "Anonymous"}
                        </h3>
                      </div>
                    </div>
                    <h4
                      className={`font-semibold mb-2 ${
                        viewType === "compact" ? "text-sm" : ""
                      }`}
                    >
                      {post.title}
                    </h4>
                    {viewType !== "compact" && (
                      <p className="text-gray-600 mb-2">{post.content}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleVote(post._id, true);
                          }}
                          disabled={voteLoading[post._id]}
                          className={`p-1 rounded-full transition-colors ${
                            userVotes[post._id] === "up"
                              ? "text-green-600"
                              : "text-gray-500 hover:text-green-600 hover:bg-gray-100"
                          }`}
                        >
                          <ThumbsUp
                            className={`h-4 w-4 ${
                              userVotes[post._id] === "up" ? "fill-current" : ""
                            }`}
                          />
                          <span className="ml-1">{post.likes || 0}</span>
                        </button>

                        <button className="p-1 rounded-full text-gray-500 hover:bg-gray-100">
                          <MessageSquare className="h-4 w-4" />
                          <span className="ml-1">
                            {post.comments?.length || 0}
                          </span>
                        </button>
                      </div>
                      <button
                        onClick={(e) => handleSave(e, post._id)}
                        className={`p-1 rounded-full transition-colors ${
                          savedPosts.has(post._id)
                            ? "text-blue-600"
                            : "text-gray-500 hover:text-blue-600 hover:bg-gray-100"
                        }`}
                      >
                        <Bookmark
                          className={`h-4 w-4 ${
                            savedPosts.has(post._id) ? "fill-current" : ""
                          }`}
                        />
                      </button>
                    </div>
                    <div
                      className={`text-gray-500 mt-2 ${
                        viewType === "compact" ? "text-xs" : "text-sm"
                      }`}
                    >
                      Posted {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Create Post Modal */}
      {isNewPostModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl m-4">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">Create New Post</h2>
              <button
                onClick={() => setIsNewPostModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#078BFE]"
                  placeholder="Enter your post title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  value={newPost.content}
                  onChange={(e) =>
                    setNewPost((prev) => ({ ...prev, content: e.target.value }))
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#078BFE] resize-none"
                  placeholder="Write your post content..."
                  rows="6"
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewPostModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 bg-[#078BFE] text-white rounded-lg hover:bg-[#0570cb] 
                    ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isSubmitting ? "Creating..." : "Create Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Post Detail Modal */}
      {isPostModalOpen && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl m-4 max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold">Post Details</h2>
              <button
                onClick={() => {
                  setIsPostModalOpen(false);
                  setSelectedPost(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="flex items-start gap-3 mb-6">
                <div>
                  <h3 className="font-semibold">
                    {selectedPost.userId?.name || "Anonymous"}
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold">{selectedPost.title}</h4>
                <p className="text-gray-600">{selectedPost.content}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>
                    Posted{" "}
                    {new Date(selectedPost.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">Comments</h3>

                {/* Comment Input */}
                <form onSubmit={handleCommentSubmit} className="mb-6">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#078BFE] resize-none"
                    rows="3"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="submit"
                      disabled={isSubmittingComment || !newComment.trim()}
                      className={`px-4 py-2 bg-[#078BFE] text-white rounded-lg hover:bg-[#0570cb] 
                        ${
                          isSubmittingComment || !newComment.trim()
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                    >
                      {isSubmittingComment ? "Posting..." : "Post Comment"}
                    </button>
                  </div>
                </form>

                {/* Comments List */}
                {isLoadingComments ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#078BFE] mx-auto"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment._id} className="flex gap-3">
                        <img
                          src={
                            comment.userId?.avatar ||
                            "https://via.placeholder.com/32"
                          }
                          alt={`${comment.userId?.name || "User"}'s avatar`}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-grow">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold">
                                {comment.userId?.name || "Anonymous"}
                              </span>
                              <span className="text-sm text-gray-500">
                                {new Date(
                                  comment.createdAt
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-600">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
