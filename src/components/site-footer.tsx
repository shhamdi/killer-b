import { Icons } from "./icons"

const SiteFooter = ({ className }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <footer className={className}>
      <div className="container flex flex-col items-center gap-5 py-8 md:flex-row">
        <Icons.logo className="mr-2 h-7 w-7" />
        <p className="text-center text-sm leading-loose md:text-left">
          Built by{" "}
          <a
            href="https://github.com/shhamdi"
            target="_blank"
            rel="noreferrer"
            className="font-semibold underline"
          >
            shhamdi
          </a>
          . Hosted on{" "}
          <a
            href="https://vercel.com/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold underline"
          >
            Vercel
          </a>
          . Ilustrations by{" "}
          <a
            href="https://popsy.co/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold underline"
          >
            Popsy
          </a>
          . The source code is available on{" "}
          <a
            href="https://github.com/shhamdi/killer-b"
            target="_blank"
            rel="noreferrer"
            className="font-semibold underline"
          >
            Github
          </a>
        </p>
      </div>
    </footer>
  )
}

export default SiteFooter
