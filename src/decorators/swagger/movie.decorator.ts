import { applyDecorators } from '@nestjs/common';

import { ApiCookieAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

//* @ApiTags(): 컨트롤러 클래스 또는 메서드에 태그를 추가하여 API 엔드포인트를 그룹화하고 API 문서를 구조화할 수 있습니다.
//* @ApiOperation(): 이 데코레이터는 컨트롤러 클래스 또는 각각의 API 엔드포인트 메서드에 적용됩니다. 이를 통해 API 엔드포인트에 대한 설명, 요청 및 응답 형식, 태그 등을 정의할 수 있습니다.
//* @ApiResponse(): 컨트롤러 메서드의 응답에 대한 설명을 추가할 때 사용합니다. 이 데코레이터를 사용하여 응답 코드, 설명, 예제 응답 등을 지정할 수 있습니다.
//* @ApiBearerAuth(): 컨트롤러 메서드 또는 클래스에서 JWT 또는 Bearer 토큰 인증을 요구하는 경우 사용합니다. 이 데코레이터를 사용하여 해당 엔드포인트가 토큰 인증을 필요로 함을 나타냅니다.
//* @ApiParam(): 컨트롤러 메서드의 파라미터에 대한 설명을 추가할 때 사용합니다. 이를 통해 파라미터의 이름, 설명, 데이터 타입, 필수 여부 등을 지정할 수 있습니다.

//^ @ApiResponse(): 주로 컨트롤러 메서드에 작성합니다. 이 데코레이터는 특정 API 엔드포인트의 응답에 대한 설명을 제공하므로 해당 메서드와 관련이 있습니다.
//^ @ApiOperation(): 이 데코레이터 역시 주로 컨트롤러 메서드에 작성합니다. API 엔드포인트에 대한 설명과 요청 및 응답 형식을 정의하기 때문에 해당 메서드와 관련이 있습니다.
//^ @ApiTags(): 주로 컨트롤러 클래스에 작성합니다. 이 데코레이터를 사용하여 여러 API 엔드포인트를 그룹화하고 API 문서를 구조화할 수 있습니다. 컨트롤러 클래스 자체에 태그를 부여하여 API 엔드포인트를 논리적으로 구분할 수 있습니다.
//^ @ApiBearerAuth(): 주로 컨트롤러 메서드 또는 클래스에 작성합니다. 해당 엔드포인트나 클래스가 JWT 또는 Bearer 토큰 인증을 필요로 할 때 사용합니다. 이 데코레이터를 사용하여 해당 위치에서만 인증이 필요하다는 것을 명시합니다.

export const ApiMovieSetting = () => {
  return applyDecorators(ApiTags('영화 API'), ApiCookieAuth('accessToken'));
};

export const ApiGetMovies = () => {
  return applyDecorators(
    ApiOperation({
      summary: '모든 영화 얻기',
      description: '모든 영화를 얻습니다. ',
    }),
    ApiResponse({
      description: '성공',
      schema: {
        example: [
          { id: 1, title: '바람과 함께 사라지다.', email: 'test@test.com' },
          { id: 2, title: '태극기 휘날리며', email: 'test123@test.com' },
        ],
      },
    }),
  );
};

export const ApiGetMovieById = () => {
  return applyDecorators(
    ApiOperation({
      summary: '특정 영화 얻기',
      description: '영화 id에 해당되는 영화를 얻습니다.',
    }),
    ApiParam({ name: 'id', example: 1 }),
    ApiResponse({
      description: '성공',
      schema: {
        example: { id: 1, title: '바람과 함께 사라지다.', email: 'test@test.com' },
      },
    }),
  );
};

export const ApiAddMovie = () => {
  return applyDecorators(
    ApiOperation({
      summary: '영화 추가하기',
      description: '로그인한 유저로 영화 추가하기',
    }),
    ApiResponse({
      description: '성공',
      schema: {
        example: { id: 1, title: '바람과 함께 사라지다.', email: 'test@test.com' },
      },
    }),
  );
};

export const ApiUpdateMovie = () => {
  return applyDecorators(
    ApiOperation({
      summary: '영화 수정하기',
      description: '전달받은 영화 데이터(일부 또는 전체)로 데이터를 수정한다.',
    }),
    ApiParam({ name: 'id', example: 1 }),
    ApiResponse({
      description: '성공',
      schema: {
        example: { id: 1, title: '바람과 함께 사라지나?', email: 'test@test.com' },
      },
    }),
  );
};

export const ApiDeleteMovie = () => {
  return applyDecorators(
    ApiOperation({
      summary: '영화 삭제하기',
      description: '영화 id와 일치하는 영화를 삭제한다.',
    }),
    ApiParam({ name: 'id', example: 1 }),
    ApiResponse({
      description: '성공',
      schema: {
        example: { id: 1, title: '바람과 함께 사라지다.', email: 'test@test.com' },
      },
    }),
  );
};
