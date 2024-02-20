export default function Header({ user }) {
  return (
    <header className="w-full mb-auto">
      <div className="flex items-center justify-between">
        <h3 className="mb-0">
          <a href="/">Birbla</a>
        </h3>
        <nav className="flex items-center space-x-4">
          {user ? (
            <a className="font-bold py-1 px-0" href="/profile">
              {user.email}
            </a>
          ) : (
            <a className="font-bold py-1 px-0" href="/login">
              Login
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
