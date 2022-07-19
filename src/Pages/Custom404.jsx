import { Link } from 'react-router-dom';
const Custom404 = () => {
  return (
    <div>
      Show not found. <Link to={'/'}>Go back to home page</Link>
    </div>
  );
};

export default Custom404;
