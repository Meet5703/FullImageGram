import PostCard from "../components/PostCard";

const Home = () => {
  return (
    <div>
      <div className="grid mt-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-4 max-w-screen-xl mx-auto">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </div>
  );
};

export default Home;
