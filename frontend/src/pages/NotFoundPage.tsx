import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center p-6 text-center">
      <div>
        <h1 className="text-3xl font-bold">Page not found</h1>

        <Link
          to="/shop"
          className="mt-4 inline-block text-[#712CDC]"
        >
          Go to Shop
        </Link>
      </div>
    </main>
  );
}