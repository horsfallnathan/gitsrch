export default function ProgressBar({ progressProps }) {
  const { totalCount, currCount } = progressProps;
  return (
    <div className="h-2 relative w-full rounded-full bg-dark-3 overflow-hidden">
      <div className="w-full h-full bg-dark-3 absolute"></div>
      <div
        id="bar"
        style={{ width: `${Math.floor((100 * currCount) / totalCount)}%` }}
        className={`h-full bg-success relative`}
      ></div>
    </div>
  );
}
