import { Metadata } from "next"

import Editor from "@/components/editor"

export const metadata: Metadata = {
  title: "Dashboard",
}

const DashboardPage = () => {
  return (
    <div>
      <Editor className="w-screen" />
    </div>
  )
}

export default DashboardPage
