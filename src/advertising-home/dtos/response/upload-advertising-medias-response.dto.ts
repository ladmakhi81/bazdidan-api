import { ApiProperty } from '@nestjs/swagger';

export class UploadAdvertisingMediaItemResponseDTO {
  @ApiProperty({ required: true })
  fileName: string;
}

export class UploadAdvertisingMediasResponseDTO {
  @ApiProperty({
    required: true,
    type: [UploadAdvertisingMediaItemResponseDTO],
  })
  medias: UploadAdvertisingMediaItemResponseDTO[];
}
