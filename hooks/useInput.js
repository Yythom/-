import { useMemo, useState } from 'react'



const useHooks = () => {
    const handle = useMemo(() => {
        return {
            a: 1
        }
    })
    return [handle]
}

export default useHooks;