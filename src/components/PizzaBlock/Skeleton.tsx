import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="135" cy="130" r="122" />
    <rect x="0" y="268" rx="0" ry="0" width="280" height="27" />
    <rect x="0" y="313" rx="10" ry="10" width="280" height="76" />
    <rect x="0" y="435" rx="0" ry="0" width="84" height="23" />
    <rect x="125" y="425" rx="20" ry="20" width="155" height="42" />
  </ContentLoader>
);

export default Skeleton;
