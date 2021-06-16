import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { DoublyLinkedList, DoublyLinkedListNode } from "@datastructures-js/linked-list";


interface IdsListProviderProps {
    children: ReactNode;
}

interface IdsListContextData {
    idsList: DoublyLinkedList;
    createIdsList: (sizes: number, genders: number, ages: number) => void;
}

const IdsListContext = createContext<IdsListContextData>({} as IdsListContextData);

export function IdsListProvider({ children }: IdsListProviderProps) {

    const [idsList, setIdsList] = useState<DoublyLinkedList<number>>(null);

    function createIdsList(sizes: number, genders: number, ages: number) {
        console.log(`dados para criar lista duplamente ligada: sizes=${sizes}, gender=${genders}, ages=${ages}`);

        let list = new DoublyLinkedList<number>();
        let node = new DoublyLinkedListNode<number>();
        list.insertFirst(3);
        list.insertLast(4);
        list.insertLast(5);

        console.log("lista ligada:");
        list.forEach(
            (node: DoublyLinkedListNode, position: number) => console.log(node.getValue(), position)
        );

        console.log("verifica se o número 5 está na lista: ");
        const node5 = list.find(
            (node: DoublyLinkedListNode, position: number) => node.getValue() === 5
        );
        console.log("========>", node5.getValue());

        setIdsList(list);
    }

    return (
        <IdsListContext.Provider value={{ idsList, createIdsList }}>
            {children}
        </IdsListContext.Provider>
    );
}

export function useIdsList() {
    const context = useContext(IdsListContext);

    return context;
}
