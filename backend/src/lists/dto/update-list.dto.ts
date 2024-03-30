import { CreateListDto } from './create-list.dto';
import { PartialType } from '@nestjs/mapped-types';

class UpdateListDto extends PartialType(CreateListDto) {}

export { UpdateListDto };
