import StoryCard from "./StoryCard";

export default function StoryGrid({ stories }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} variant="grid" />
      ))}
    </div>
  );
}
