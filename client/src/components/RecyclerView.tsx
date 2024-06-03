import { useState, useEffect, useRef, ReactNode } from "react";

interface IRecyclerViewProps<T> {
  data: T[];
  onScrollDown: () => void;
  rowRenderer: (item: T) => ReactNode;
}

const RecyclerView = <T,>({
  data,
  onScrollDown,
  rowRenderer,
}: IRecyclerViewProps<T>) => {
  const [visibleData, setVisibleData] = useState(data);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const clientHeight = e.target.clientHeight;
    const scrollHeight = e.target.scrollHeight;

    const isBottom = Math.ceil(scrollTop + clientHeight)+30 >= scrollHeight;

    if (isBottom) {
      onScrollDown();
    }
  };

  useEffect(() => {
    setVisibleData(data);
  }, [data]);

  return (
    <div
      ref={containerRef}
      style={{ height: "100%", overflow: "auto" }}
      onScroll={handleScroll}
    >
      {visibleData.map((item) => rowRenderer(item))}
    </div>
  );
};

export default RecyclerView;
