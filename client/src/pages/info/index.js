// Import activity feed
import ActivityFeed from '../../components/activity-feed'

export default function Info() {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="bg-white overflow-hidden shadow rounded-lg block">
        <div className="px-4 py-5">
          <ActivityFeed />
        </div>
      </div>
    </div>
  )
}
