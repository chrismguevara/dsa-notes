const navigation = [
  {
    name: "Home",
    href: "/",
    icon: null,
  },
  // TODO: Add GitHub link
  // {
  //   name: "GitHub",
  //   href: "#",
  //   icon: null,
  // },
];

export default function Footer(props: { className?: string }) {
  return (
    <footer className={props.className}>
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center gap-x-6 md:order-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {item.name}
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-sm/6 text-gray-600 dark:text-gray-400 md:order-1 md:mt-0">
          &copy; 2024 Chris Guevara. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
