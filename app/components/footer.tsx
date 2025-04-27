import { Link } from "react-router";

export default function Footer(props: { className?: string }) {
  return (
    <footer className={props.className}>
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center gap-x-6 md:order-2">
          <Link to="/">Home</Link>
          {/* TODO: Add GitHub link */}
        </div>
        <p className="mt-8 text-center text-sm/6 text-gray-600 dark:text-gray-400 md:order-1 md:mt-0">
          &copy; 2024 Chris Guevara. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
