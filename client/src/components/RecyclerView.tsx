import { useState, useEffect, useRef, ReactNode } from "react";

interface IRecyclerViewProps<T> {
  data: T[];
  onScrollUp: () => void;
  onScrollDown: () => void;
  itemHeight: number;
  rowRenderer: (item: T) => ReactNode;
}

const RecyclerView = <T,>({
  data,
  onScrollUp,
  onScrollDown,
  itemHeight,
  rowRenderer,
}: IRecyclerViewProps<T>) => {
  const [visibleData, setVisibleData] = useState<T[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update the visible data when the component mounts or the data prop changes
    setVisibleData(data);
  }, [data]);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
      if (scrollTop === 0) {
        // Scrolled to the top, trigger onScrollUp callback
        onScrollUp();
      } else if (scrollTop + clientHeight === scrollHeight) {
        // Scrolled to the bottom, trigger onScrollDown callback
        onScrollDown();
      }
    }
  };

  const totalHeight = data.length * itemHeight;
  const visibleHeight = visibleData.length * itemHeight;
  const topHeight = Math.max(
    0,
    (data.indexOf(visibleData[0]) || 0) * itemHeight
  );
  const bottomHeight = totalHeight - visibleHeight - topHeight;

  return (
    <div
      ref={containerRef}
      style={{ height: "100%", overflow: "auto" }}
      onScroll={handleScroll}
    >
      <div style={{ height: topHeight }} />
      {visibleData.map((item, index) => (
        <div key={index}>{rowRenderer(item)}</div>
      ))}
      <div style={{ height: bottomHeight }} />
    </div>
  );
};

export default RecyclerView;
