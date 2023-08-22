import { Metadata } from "next"

import Editor from "@/components/editor/index"

export const metadata: Metadata = {
  title: "Dashboard",
}

const DashboardPage = () => {
  return (
    <div>
      <Editor />
    </div>
  )
}

export default DashboardPage
