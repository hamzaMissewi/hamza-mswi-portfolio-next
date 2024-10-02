import React from "react";

export default function ImagesGrid({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="mb-5 text-lg font-semibold text-indigo-900">{title}</h2>
      <ul className="grid list-none grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {children}
      </ul>
    </div>
  );
}
