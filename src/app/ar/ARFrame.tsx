"use client";

export default function ARFrame() {
  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      <iframe
        src="/ar/index.html"
        title="에그시 AR 트래킹"
        allow="camera; microphone; autoplay; fullscreen; accelerometer; gyroscope; magnetometer"
        className="h-full w-full border-0"
      />
    </div>
  );
}
