/// <reference types="multer" />
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
export declare class PersonController {
    private readonly personService;
    constructor(personService: PersonService);
    create(createPersonDto: CreatePersonDto): string;
    import(createPersonDto: CreatePersonDto, files: Array<Express.Multer.File>): string;
    findAll(): string;
    search(name: string, age: number): string;
    urlParams(id: string): string;
    update(id: string, updatePersonDto: UpdatePersonDto): string;
    remove(id: string): string;
}
