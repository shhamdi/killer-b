import { Metadata } from "next"

import Editor from "@/components/editor/editor"

export const metadata: Metadata = {
  title: "Dashboard",
}

const DashboardPage = () => {
  return (
    <div>
      <Editor className="container my-4" />
    </div>
  )
}

export default DashboardPage
