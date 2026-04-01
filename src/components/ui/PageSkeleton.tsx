import Container from './Container'
import Skeleton from './Skeleton'

export default function PageSkeleton() {
  return (
    <div className="relative z-10">
      <Container className="pt-24 pb-18">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <Skeleton className="h-4 w-32 rounded-full" />
            <Skeleton className="h-16 w-full max-w-xl" />
            <Skeleton className="h-16 w-full max-w-2xl" />
            <Skeleton className="h-6 w-full max-w-2xl" />
            <div className="flex gap-3 pt-4">
              <Skeleton className="h-12 w-36 rounded-xl" />
              <Skeleton className="h-12 w-36 rounded-xl" />
            </div>
          </div>
          <Skeleton className="h-[26rem] rounded-[2rem]" />
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <Skeleton className="h-64 rounded-[1.75rem]" />
          <Skeleton className="h-64 rounded-[1.75rem]" />
          <Skeleton className="h-64 rounded-[1.75rem]" />
        </div>
      </Container>
    </div>
  )
}
