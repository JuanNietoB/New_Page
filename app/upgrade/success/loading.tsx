import { Card, CardContent } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export default function UpgradeSuccessLoading() {
  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-center text-muted-foreground">
              Loading...
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
