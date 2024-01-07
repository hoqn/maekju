import Navbar from "@/components/common/navbar";
import Button from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="min-h-full bg-base-50">
        <div className="container h-full mx-auto px-6 flex flex-col">
          <Navbar.Inset />
          <div className="flex-1">
            <article className="prose max-w-none">
              <h2>나만의 맥주를 만들어보세요</h2>
              <p>
                맥주는 맥아(몰트)를 발효시키고 이를 주재료로 하여 만드는 양조주예요.
              </p>
              <p>
                효모가 맥아를 비롯한 재료의 당 성분을 먹고 이산화탄소와 알코올 성분을 생성해요. 이때 향과 쓴맛을 추가하기 위해 홉을 거의 필수적으로 사용한답니다.
              </p>
            </article>
          </div>
          <div style={{ height: "8rem" }}></div> {/* 아래 버튼 Inset */}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <div className="h-12 from-base-50 to-transparent bg-gradient-to-t"></div>
        <div className="container mx-auto px-4 pb-4 bg-base-50">
          <Button
            className="shadow-lg active:shadow-none rounded-2xl"
            intent="contained"
            tint="primary"
            size="lg"
            asChild
          >
            <Link href="/brew/ing">나만의 맥주 양조하기</Link>
          </Button>
        </div>
      </div>
      <Navbar className="fixed top-0 left-0 right-0" navAction="close" />
    </>
  );
}
