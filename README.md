# Maekju

나만의 맥주를 만들어보세요!

https://maekju.vercel.app/

- 몰트(맥아)와 홉 종류를 선택할 수 있어요.
- 선택한 재료에 맞춰 맥주의 색깔이 예측돼요. 이때 *degree Lovibond*와 *SRM* 수치를 활용했어요.
- 완성된 맥주를 맥주잔에 따라 볼 수 있도록 인터랙션을 구성했어요.

> [!NOTE]
>
> `2024. 01. 06. - 2024. 01. 07.`
> 
> `하루 개발` 프로젝트로 진행하였습니다. 기획부터 개발까지 모두 하루만에 마무리하려 하였지만, 계획보다 다소 늦어져 이틀 정도 걸렸어요.

## 미리보기

- 재료 선택
  
  <img src="https://github.com/hoqn/maekju/assets/4702412/7a97a5da-b941-4501-bfe4-ec5b886e789b" width="256" />

- 완성 페이지

  <img src="https://github.com/hoqn/maekju/assets/4702412/ffcd5c44-3e3a-4e63-a957-c2aba9561e5f" width="256" />
  <img src="https://github.com/hoqn/maekju/assets/4702412/af984474-cbc7-45d8-9295-f41446b70191" width="256" />
  <img src="https://github.com/hoqn/maekju/assets/4702412/068a1ac4-0e7a-4bba-8475-87b1aec8bb57" width="256" />

## 개발

### Stacks

`React` `TypeScript` `Next.js` `Tailwind css` `Zustand`

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

### 붙임

맥주의 SRM 레벨에 따른 색상은 https://www.barleydogbrewery.com/xml/colors.xml 의 수치를 사용하였습니다.

맥주 첨가물 및 부가물의 여러 수치(L, G value)와 설명은 https://byo.com/resource/grains 에 기초하였습니다.
