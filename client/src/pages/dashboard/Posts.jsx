import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  X,
  ThumbsDownIcon,
  ThumbsUpIcon,
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

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [userVotes, setUserVotes] = useState({});
  const [savedPosts, setSavedPosts] = useState(new Set());
  const [voteLoading, setVoteLoading] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
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

  const handlePostClick = async (postId) => {
    try {
      const post = await getPostById(postId);
      setSelectedPost(post);
      setIsPostModalOpen(true);
      fetchComments(postId);
    } catch (error) {
      console.error("Failed to fetch post details:", error);
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
        userId: JSON.parse(localStorage.getItem("user")).id,
      });
      setComments((prev) => [...prev, comment]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to create comment:", error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleVote = async (postId, isUpvote) => {
    try {
      setVoteLoading((prev) => ({ ...prev, [postId]: true }));

      const voteFunction = isUpvote ? upvotePost : downvotePost;
      const updatedPost = await voteFunction(postId);

      // Update posts with new vote count
      setPosts(
        posts.map((post) =>
          post._id === postId ? { ...post, votes: updatedPost.votes } : post
        )
      );

      // Update user's vote state
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
    e.stopPropagation(); // Prevent post modal from opening
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Posts</h1>
        <Button onClick={() => setIsNewPostModalOpen(true)}>Create Post</Button>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <Card
            key={post._id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handlePostClick(post._id)}
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  {post.userId?.name?.charAt(0) || "A"}
                </div>
                <div>
                  <CardTitle className="text-lg">
                    {post.userId?.name || "Anonymous"}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-2">{post.title}</h3>
              <p className="text-lg mb-4">{post.content}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <ThumbsUpIcon className="h-4 w-4 mr-2" />
                    {post.likes || 0}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    {post.comments?.length || 0}
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => handleSave(e, post._id)}
                  className={savedPosts.has(post._id) ? "text-blue-600" : ""}
                >
                  <Bookmark
                    className={`h-4 w-4 ${
                      savedPosts.has(post._id) ? "fill-current" : ""
                    }`}
                  />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
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
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsNewPostModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  Create Post
                </Button>
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
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">{selectedPost.title}</h3>
                <p className="text-gray-600">{selectedPost.content}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>
                    Posted by {selectedPost.userId?.name || "Anonymous"} on{" "}
                    {new Date(selectedPost.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">Comments</h3>

                <form onSubmit={handleCommentSubmit} className="mb-6">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#078BFE] resize-none"
                    rows="3"
                  />
                  <div className="flex justify-end mt-2">
                    <Button
                      type="submit"
                      disabled={isSubmittingComment || !newComment.trim()}
                    >
                      {isSubmittingComment ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : null}
                      Post Comment
                    </Button>
                  </div>
                </form>

                {isLoadingComments ? (
                  <div className="text-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment._id} className="flex gap-3">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                          {comment.userId?.name?.charAt(0) || "A"}
                        </div>
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
};

export default Posts;
