import { useRouter } from "next/router";
import React from "react";
import { useLocation } from "react-router-dom";
import Animal from "./[id]"

export default function Detail() {

    const router = useRouter();
    console.log(router.query);

    return (
        <Animal />
    );
}