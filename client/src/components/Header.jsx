export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold">@Codebase</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2">
          <nav className="flex items-center space-x-6">
            <a
              href="/dashboard"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Overview
            </a>
            <a
              href="/dashboard/profile"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Profile
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
