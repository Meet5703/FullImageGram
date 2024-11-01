import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faComment as farComment } from "@fortawesome/free-regular-svg-icons";
import { faPaperPlane as farPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { sampleImgPost } from "./imgSources";

const PostCard = () => {
  return (
    <div className="flex bg-white flex-col w-full max-w-md mx-auto border rounded-lg shadow-lg overflow-hidden">
      {/* User info section */}
      <div className="flex items-center p-4 border-b">
        <img
          src="https://via.placeholder.com/40" // Placeholder for user's logo
          alt="User Logo"
          className="w-10 h-10 rounded-full mr-3"
        />
        <span className="font-semibold">User Name</span>
      </div>

      {/* Image section with padding */}
      <div className="p-2">
        <img
          className="w-full h-auto rounded-lg"
          src={sampleImgPost}
          alt="Post"
        />
      </div>

      {/* Interaction options */}
      <div className="flex justify-between items-center p-4 border-t">
        <div className="flex items-center">
          <FontAwesomeIcon icon={farHeart} className="mr-1" />
          <span>Like</span>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={farComment} className="mr-1" />
          <span>Comment</span>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={farPaperPlane} className="mr-1" />
          <span>Share</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
