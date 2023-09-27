import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

//* @ApiProperty(): 이 데코레이터는 DTO 클래스의 각 속성(프로퍼티)에 적용됩니다. 이를 통해 해당 속성의 설명, 예제 값, 타입 등을 지정할 수 있습니다. 예를 들어, @ApiProperty({ description: '사용자의 이름' })와 같이 사용할 수 있습니다.
//* @ApiPropertyOptional(): 선택적으로 사용 가능한 DTO 프로퍼티에 대한 설명을 추가할 때 유용합니다. 이 데코레이터를 사용하면 해당 프로퍼티가 선택적임을 나타낼 수 있습니다.
//* @ApiResponse(): 컨트롤러의 응답에 대한 설명을 추가할 때 사용합니다. 이를 통해 응답 코드, 설명, 예제 응답 등을 정의할 수 있습니다. 예를 들어, //* @ApiResponse({ status: 200, description: '성공적인 응답' })과 같이 사용할 수 있습니다.
//* @ApiOperation(): 컨트롤러의 API 엔드포인트에 대한 설명을 추가할 때 사용합니다. 이 데코레이터를 사용하면 해당 API 엔드포인트의 이름, 설명, 요청 및 응답 형식 등을 지정할 수 있습니다.
//* @ApiTags(): 컨트롤러나 API 엔드포인트에 태그를 추가하여 관련된 엔드포인트를 그룹화할 수 있습니다. 이는 API 문서를 구조화하는 데 도움이 됩니다.
//* @ApiBearerAuth(): API 엔드포인트에 JWT 또는 Bearer 토큰 인증을 요구하는 경우 사용합니다. 이 데코레이터를 사용하여 해당 엔드포인트가 토큰 인증을 필요로 함을 나타냅니다.

//^ @ApiResponse(): 주로 컨트롤러 메서드에 작성합니다. 이 데코레이터는 특정 API 엔드포인트의 응답에 대한 설명을 제공하므로 해당 메서드와 관련이 있습니다.
//^ @ApiOperation(): 이 데코레이터 역시 주로 컨트롤러 메서드에 작성합니다. API 엔드포인트에 대한 설명과 요청 및 응답 형식을 정의하기 때문에 해당 메서드와 관련이 있습니다.
//^ @ApiTags(): 주로 컨트롤러 클래스에 작성합니다. 이 데코레이터를 사용하여 여러 API 엔드포인트를 그룹화하고 API 문서를 구조화할 수 있습니다. 컨트롤러 클래스 자체에 태그를 부여하여 API 엔드포인트를 논리적으로 구분할 수 있습니다.
//^ @ApiBearerAuth(): 주로 컨트롤러 메서드 또는 클래스에 작성합니다. 해당 엔드포인트나 클래스가 JWT 또는 Bearer 토큰 인증을 필요로 할 때 사용합니다. 이 데코레이터를 사용하여 해당 위치에서만 인증이 필요하다는 것을 명시합니다.

export class GetMovieDto {
  @IsNumber()
  @ApiProperty({ example: 1, description: '영화 id', required: true })
  id: number;
}

export class AddMovieDto {
  @IsString()
  @ApiProperty({ example: 1, description: '영화 id', required: true })
  title: string;
}

export class UpdateMovieDto extends PartialType(AddMovieDto) {}
