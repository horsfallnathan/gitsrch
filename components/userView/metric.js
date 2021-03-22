import { FollowerIcon, StargazerIcon } from "../icons";

/**
 * Object contaning svg files for required icons
 */
const icons = {
  followers: <FollowerIcon />,
  stargazers: <StargazerIcon />,
};

/**
 * Displays user metric and icon
 */
export default function Metric({ details }) {
  const {
    /** Metric amount */
    count,
    /** String key for icon */
    icon,
    /** Metric label or text */
    description,
  } = details;

  return (
    <div className="metric">
      {icons[icon]}
      <p>
        {count} {description}
      </p>
    </div>
  );
}
