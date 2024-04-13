import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale('ko', {
    relativeTime: {
        future: '%s 후',
        past: '%s 전',
        s: '몇 초',
        m: '1분',
        mm: '%d분',
        h: '한 시간',
        hh: '%d시간',
        d: '하루',
        dd: '%d일',
        M: '한 달',
        MM: '%d개월',
        y: '일 년',
        yy: '%d년',
    },
});

dayjs.locale('ko');

const getFromNow = (date: string): string => {
    return dayjs(date).fromNow();
};

const getKoreanFormat = (date: string): string => {
    return dayjs(date).format('YYYY년 M월 D일 HH:mm');
};

export { getFromNow, getKoreanFormat };
