import Headline from '@/components/Typography/Headline';
import Text from '@/components/Typography/Text';

export default function Page() {
    return (
        <>
            <Headline>핀치독스 - 실시간 해외 경제 뉴스 & 트렌드</Headline>
            <Text className="mt-4">
                해외 경제 뉴스와 커뮤니티 트렌드를 요약/번역해 제공합니다.
                새로고침 없이 항상 최신 정보가 업데이트 됩니다.
            </Text>
            <Text className="mt-4">
                국내 투자자들에게 가장 빠르게 해외 경제 이슈를 전달하기 위해
                서비스를 개발했습니다.
            </Text>

            <Text className="mt-4">
                핀치독스는 다음과 같은 기술을 사용해 제작되었습니다:
            </Text>
            <Text>
                - OpenAI GPT 모델로 텍스트/이미지 데이터를 처리해 컨텐츠를
                생성합니다.
            </Text>
            <Text>
                - Supabase 데이터베이스와 실시간 연결되어 최신 컨텐츠를 곧바로
                확인할 수 있습니다.
            </Text>
        </>
    );
}
