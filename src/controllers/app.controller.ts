import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from '@/services/app.service';

// @Controller에 인수로 {host: 'url~~'} 를 넣어주면, http 요청한 host를 확인하여 응답할 수 있도록 할 수 있다.
@Controller('app') // [선택] : 인수를 넘겨주면 path가 된다.
export class AppController {
  constructor(private readonly appService: AppService) {}

  // /app 경로의 get 요청은 아래 메서드가 담당한다.
  // @All() 데코레이터를 사용해서 모든 메서드를 핸들링할 수 있다.

  // @Get()
  // get 요청은 200, post 요청은 201 상태코드를 응답한다. 만약, 상태코드를 변경하고 싶다면 @HttpCode() 데코레이터로 변경할 수 있다.
  // @HttpCode(204)

  // 헤더도 지정할 수 있다.
  // @Header('Cache-Control', 'none')

  // 리다이렉트를 할 수도 있다(프론트에 위임하는게 코드가독성에 좋지 않을까...?)
  // @Redirect는 2가지 인수를 받는데, 첫번째는 url, 두번째는 상태코드를 넣는다 기본값으로는 302를 갖는다.
  // @Redirect('https://nestjs.com', 301)
  // 만약 리다이렉트를 동적으로 하고 싶다면 아래와 같이 할 수 있다.
  @Get('docs')
  // @Redirect('https://docs.nestjs.com', 302)
  // @Param에 인수를 넣으면, 해당 인수만 받을 수 있고 생략하면, 전체 파라미터를 받을 수 있다.
  getDocs(@Param('version') version: number) {
    if (version === 5)
      return {
        url: 'https://docs.nestjs.com/v5/',
        statusCode: 301,
      };
  }

  // 매소드의 이름은 라우팅에 영향을 주지 않는다.
  @Get()
  getHello(): string {
    // getHello 메서드는 @Res 데코레이터를 이용해서 주입할 수 있다.
    return this.appService.getHello(); // 반환되는 값의 경우, 원시값은 그 자체로 넘겨지고 배열이나 객체는 JSON 형태로 반환된다.
  }

  @Get('hi/world')
  getHi(): string {
    return this.appService.getHi();
  }
}
