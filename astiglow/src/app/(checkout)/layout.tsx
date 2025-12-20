// src/app/(checkout)/layout.tsx

export default function CheckoutLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <main id="main-content" className="flex-1 flex flex-col">
        {children}
      </main>
    );
  }