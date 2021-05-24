import { FilterTitle } from './FilterTitle';
import { Size } from './Size';
import { Gender } from './Gender';
import { Age } from './Age';

export function FilterForm() {

    return (
        <>
            <FilterTitle name="Porte" />
            <Size />
            <FilterTitle name="Gênero" />
            <Gender />
            <FilterTitle name="Idade" />
            <Age />
        </>
    );

}