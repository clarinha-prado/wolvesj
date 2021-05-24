import { FilterTitle } from './FilterTitle';
import { Size } from './Size';
import { Gender } from './Gender';

export function FilterForm() {

    return (
        <>
            <FilterTitle name="Porte" />
            <Size />
            <FilterTitle name="Gênero" />
            <Gender />
        </>
    );

}