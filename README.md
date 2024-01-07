## 개발

### Stacks

`React` `TypeScript` `Next.js` `Tailwind css` `Zustand` `Framer Motion`

### 설명

맥주의 SRM 레벨에 따른 색상은 https://www.barleydogbrewery.com/xml/colors.xml 의 수치를 사용하였습니다.

맥주 첨가물 및 부가물의 여러 수치(L, G value)와 설명은 https://byo.com/resource/grains 에 기초하였습니다.

### 폴더 구조

```
src/
    components/     # (비교적) 프로젝트나 라우팅에 독립적인 컴포넌트 배치
    app/
        _components/    # 현재 프로젝트나 라우팅에 종속적인 컴포넌트 배치
        /path/for/routes
            page.tsx
            layout.tsx
            ...
```
