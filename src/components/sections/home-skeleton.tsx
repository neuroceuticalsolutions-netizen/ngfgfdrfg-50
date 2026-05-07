import { Skeleton } from "@/components/ui/skeleton"

export const HomeSkeleton = () => {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      {/* Navigation Skeleton */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-grey-200">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-40 rounded-md" />
            <div className="hidden md:flex items-center space-x-8">
              <Skeleton className="h-4 w-16 rounded" />
              <Skeleton className="h-4 w-16 rounded" />
              <Skeleton className="h-4 w-16 rounded" />
              <Skeleton className="h-4 w-16 rounded" />
              <Skeleton className="h-4 w-20 rounded" />
            </div>
            <Skeleton className="hidden md:block h-8 w-28 rounded-full" />
            <Skeleton className="md:hidden h-6 w-6 rounded" />
          </div>
        </div>
      </nav>

      {/* Hero Skeleton */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 bg-royal-purple/80">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto md:mx-0 space-y-6">
            <Skeleton className="h-12 sm:h-16 md:h-20 w-3/4 mx-auto md:mx-0 rounded-lg bg-white/20" />
            <Skeleton className="h-12 sm:h-16 md:h-20 w-1/2 mx-auto md:mx-0 rounded-lg bg-white/20" />
            <Skeleton className="h-6 sm:h-8 w-full max-w-xl mx-auto md:mx-0 rounded bg-white/15" />
            <Skeleton className="h-6 sm:h-8 w-2/3 max-w-xl mx-auto md:mx-0 rounded bg-white/15" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <Skeleton className="h-12 w-40 rounded-full bg-white/25" />
              <Skeleton className="h-12 w-40 rounded-full bg-white/15" />
            </div>
          </div>
        </div>
      </section>

      {/* Audience Selector Skeleton */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <Skeleton className="h-10 w-64 mx-auto rounded-lg" />
            <Skeleton className="h-6 w-80 mx-auto rounded" />
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="border-2 border-grey-200 rounded-xl p-8 space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <Skeleton className="h-8 w-48 rounded" />
                <Skeleton className="h-5 w-72 rounded" />
              </div>
              <div className="space-y-3 flex flex-col items-center">
                <Skeleton className="h-4 w-40 rounded" />
                <Skeleton className="h-4 w-40 rounded" />
                <Skeleton className="h-4 w-40 rounded" />
              </div>
              <Skeleton className="h-12 w-full rounded-full" />
            </div>
            <div className="border-2 border-grey-200 rounded-xl p-8 space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <Skeleton className="h-8 w-48 rounded" />
                <Skeleton className="h-5 w-72 rounded" />
              </div>
              <div className="space-y-3 flex flex-col items-center">
                <Skeleton className="h-4 w-40 rounded" />
                <Skeleton className="h-4 w-40 rounded" />
                <Skeleton className="h-4 w-40 rounded" />
              </div>
              <Skeleton className="h-12 w-full rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section Skeleton */}
      <section className="py-20 bg-subtle-gradient">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Skeleton className="h-10 sm:h-12 w-64 mx-auto rounded-lg" />
            <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-medium space-y-6">
              <Skeleton className="h-6 w-full rounded" />
              <Skeleton className="h-6 w-5/6 mx-auto rounded" />
              <Skeleton className="h-5 w-4/5 mx-auto rounded" />
              <Skeleton className="h-5 w-3/4 mx-auto rounded" />
              <div className="flex flex-wrap justify-center items-center gap-6 mt-8">
                <div className="text-center space-y-2">
                  <Skeleton className="h-6 w-10 mx-auto rounded-sm" />
                  <Skeleton className="h-4 w-24 mx-auto rounded" />
                </div>
                <div className="text-center space-y-2">
                  <Skeleton className="h-6 w-6 mx-auto rounded" />
                  <Skeleton className="h-4 w-20 mx-auto rounded" />
                </div>
                <div className="text-center space-y-2">
                  <Skeleton className="h-6 w-6 mx-auto rounded" />
                  <Skeleton className="h-4 w-20 mx-auto rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Skeleton */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-16 space-y-4">
            <Skeleton className="h-10 sm:h-12 w-72 mx-auto rounded-lg" />
            <Skeleton className="h-5 sm:h-6 w-full max-w-2xl mx-auto rounded" />
            <Skeleton className="h-5 sm:h-6 w-3/4 max-w-xl mx-auto rounded" />
          </div>
          <div className="relative mb-6 sm:mb-12">
            <div className="bg-white rounded-xl overflow-hidden shadow-medium min-h-[320px] sm:min-h-[350px] lg:min-h-[400px] border border-grey-200">
              <div className="flex flex-col sm:flex-row h-full p-4 sm:p-8 gap-6">
                <div className="w-full sm:w-1/2 space-y-4">
                  <Skeleton className="h-8 sm:h-10 w-48 rounded" />
                  <Skeleton className="h-5 w-32 rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-5/6 rounded" />
                  <div className="space-y-2 pt-2">
                    <Skeleton className="h-4 w-3/4 rounded" />
                    <Skeleton className="h-4 w-2/3 rounded" />
                    <Skeleton className="h-4 w-3/4 rounded" />
                  </div>
                  <Skeleton className="h-10 w-32 rounded-lg" />
                </div>
                <div className="hidden sm:flex sm:w-1/2 items-center justify-center">
                  <Skeleton className="h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48 rounded-xl" />
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-6">
              <Skeleton className="h-8 w-20 rounded-lg" />
              <Skeleton className="h-8 w-20 rounded-lg" />
              <Skeleton className="h-8 w-20 rounded-lg" />
              <Skeleton className="h-8 w-20 rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Science Benefits Skeleton */}
      <section className="py-20 bg-subtle-gradient">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <Skeleton className="h-10 sm:h-12 w-64 mx-auto rounded-lg" />
            <Skeleton className="h-5 sm:h-6 w-full max-w-2xl mx-auto rounded" />
            <Skeleton className="h-5 sm:h-6 w-3/4 max-w-xl mx-auto rounded" />
          </div>
          <div className="relative max-w-7xl mx-auto mb-16">
            <div className="relative h-[400px] md:h-[500px] overflow-hidden border-2 border-grey-200 bg-white rounded-lg">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full md:w-1/2 p-6 md:p-12 space-y-6">
                  <div className="space-y-4">
                    <Skeleton className="h-2 w-full max-w-xs rounded" />
                    <Skeleton className="h-5 w-48 rounded" />
                  </div>
                  <div className="space-y-4">
                    <Skeleton className="h-2 w-full max-w-xs rounded" />
                    <Skeleton className="h-5 w-48 rounded" />
                  </div>
                  <div className="space-y-4">
                    <Skeleton className="h-2 w-full max-w-xs rounded" />
                    <Skeleton className="h-5 w-48 rounded" />
                  </div>
                  <div className="space-y-4">
                    <Skeleton className="h-2 w-full max-w-xs rounded" />
                    <Skeleton className="h-5 w-48 rounded" />
                  </div>
                </div>
              </div>
              <div className="absolute right-0 top-0 w-1/2 h-full hidden md:block bg-grey-100">
                <Skeleton className="h-full w-full rounded-none" />
              </div>
            </div>
            <div className="flex justify-center mt-6 space-x-2">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-3 w-3 rounded-full" />
            </div>
          </div>
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-medium max-w-4xl mx-auto space-y-6">
              <Skeleton className="h-8 w-64 mx-auto rounded" />
              <Skeleton className="h-5 w-full rounded" />
              <Skeleton className="h-5 w-5/6 mx-auto rounded" />
              <div className="grid grid-cols-2 justify-items-center gap-4">
                <Skeleton className="h-8 w-36 rounded-lg" />
                <Skeleton className="h-8 w-36 rounded-lg" />
                <Skeleton className="h-8 w-36 rounded-lg" />
                <Skeleton className="h-8 w-36 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Skeleton */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 space-y-4">
            <Skeleton className="h-10 sm:h-12 w-72 mx-auto rounded-lg" />
            <Skeleton className="h-5 sm:h-6 w-full max-w-2xl mx-auto rounded" />
            <Skeleton className="h-5 sm:h-6 w-3/4 max-w-xl mx-auto rounded" />
          </div>
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-grey-50 rounded-2xl p-6 sm:p-8 space-y-6 relative">
                <Skeleton className="absolute top-4 right-4 h-12 w-12 sm:h-16 sm:w-16 rounded-lg" />
                <Skeleton className="h-5 w-32 rounded" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-5/6 rounded" />
                  <Skeleton className="h-4 w-4/5 rounded" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24 rounded" />
                    <Skeleton className="h-3 w-20 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Mobile carousel placeholder */}
          <div className="md:hidden mb-16">
            <div className="bg-grey-50 rounded-2xl p-6 sm:p-8 space-y-6 relative">
              <Skeleton className="absolute top-4 right-4 h-12 w-12 rounded-lg" />
              <Skeleton className="h-5 w-32 rounded" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-5/6 rounded" />
                <Skeleton className="h-4 w-4/5 rounded" />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 rounded" />
                  <Skeleton className="h-3 w-20 rounded" />
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-grey-200 rounded-2xl p-6 sm:p-8 md:p-12 max-w-4xl mx-auto space-y-6">
              <Skeleton className="h-8 w-64 mx-auto rounded bg-white/50" />
              <Skeleton className="h-5 w-full rounded bg-white/50" />
              <Skeleton className="h-5 w-5/6 mx-auto rounded bg-white/50" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Skeleton className="h-8 w-8 mx-auto rounded bg-white/50" />
                  <Skeleton className="h-4 w-28 mx-auto rounded bg-white/50" />
                  <Skeleton className="h-3 w-36 mx-auto rounded bg-white/50" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-8 w-8 mx-auto rounded bg-white/50" />
                  <Skeleton className="h-4 w-28 mx-auto rounded bg-white/50" />
                  <Skeleton className="h-3 w-36 mx-auto rounded bg-white/50" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-8 w-8 mx-auto rounded bg-white/50" />
                  <Skeleton className="h-4 w-28 mx-auto rounded bg-white/50" />
                  <Skeleton className="h-3 w-36 mx-auto rounded bg-white/50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Skeleton */}
      <section className="py-20 bg-grey-200">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <Skeleton className="h-10 sm:h-12 w-64 mx-auto rounded-lg bg-white/50" />
            <Skeleton className="h-5 sm:h-6 w-full max-w-2xl mx-auto rounded bg-white/50" />
            <Skeleton className="h-5 sm:h-6 w-3/4 max-w-xl mx-auto rounded bg-white/50" />
            <div className="max-w-sm sm:max-w-md mx-auto flex flex-col sm:flex-row gap-4 pt-4">
              <Skeleton className="h-12 flex-1 rounded-lg bg-white/50" />
              <Skeleton className="h-12 w-full sm:w-32 rounded-full bg-white/50" />
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4">
              <Skeleton className="h-6 w-32 rounded-full bg-white/40" />
              <Skeleton className="h-6 w-32 rounded-full bg-white/40" />
              <Skeleton className="h-6 w-32 rounded-full bg-white/40" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Skeleton */}
      <footer className="bg-grey-900 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-6 w-48 rounded bg-white/20" />
              <Skeleton className="h-4 w-full rounded bg-white/10" />
              <Skeleton className="h-4 w-5/6 rounded bg-white/10" />
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-8 w-8 rounded-full bg-white/10" />
                <Skeleton className="h-8 w-8 rounded-full bg-white/10" />
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-6 w-32 rounded bg-white/20" />
              <Skeleton className="h-4 w-40 rounded bg-white/10" />
              <Skeleton className="h-4 w-36 rounded bg-white/10" />
              <Skeleton className="h-4 w-44 rounded bg-white/10" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <Skeleton className="h-5 w-24 rounded bg-white/20" />
                <Skeleton className="h-3 w-20 rounded bg-white/10" />
                <Skeleton className="h-3 w-16 rounded bg-white/10" />
                <Skeleton className="h-3 w-20 rounded bg-white/10" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-5 w-24 rounded bg-white/20" />
                <Skeleton className="h-3 w-28 rounded bg-white/10" />
                <Skeleton className="h-3 w-24 rounded bg-white/10" />
              </div>
            </div>
          </div>
          <div className="border-t border-grey-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <Skeleton className="h-4 w-64 rounded bg-white/10" />
              <Skeleton className="h-4 w-48 rounded bg-white/10" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
