import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";

function getRandInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function Post({ title }: { title: string }) {
  const imgId = getRandInt(1, 1080);
  return (
    <div className="card w-96 bg-base-100 shadow-xl mx-auto">
      <div className="card-body p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="w-10 h-10 rounded-full">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="User avatar"
                />
              </div>
            </div>
            <div>
              <p className="font-bold">username</p>
              <p className="text-xs">New York, NY</p>
            </div>
          </div>
          <button className="btn btn-ghost btn-circle btn-sm">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>
      <figure>
        <img
          src={`https://picsum.photos/id/${imgId}/200`}
          alt="Post image"
          className="w-full h-96 object-cover"
        />
      </figure>
      <div className="card-body p-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <button className="btn btn-ghost btn-circle">
              <Heart className="h-6 w-6" />
            </button>
            <button className="btn btn-ghost btn-circle">
              <MessageCircle className="h-6 w-6" />
            </button>
            <button className="btn btn-ghost btn-circle">
              <Send className="h-6 w-6" />
            </button>
          </div>
          <button className="btn btn-ghost btn-circle">
            <Bookmark className="h-6 w-6" />
          </button>
        </div>
        <div className="mt-4">
          <p>
            <span className="font-bold mr-2">username</span>
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}
