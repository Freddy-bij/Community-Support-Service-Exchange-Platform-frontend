import WelcomePage from "../shares/Components.tsx/Welcome"
import CommunityImpact from "../shares/ui/communityImpact"
import GettingStarted from "../shares/ui/GetStarted"
import ReadyToHelp from "../shares/ui/ReadyToHelp"
import RecentActivity from "../shares/ui/RecentActivity"

const Home = () => {
  return (
    <div >
    <WelcomePage/>
    <GettingStarted/>
    <RecentActivity/>
    <CommunityImpact/>
    <ReadyToHelp/>
    </div>
  )
}

export default Home