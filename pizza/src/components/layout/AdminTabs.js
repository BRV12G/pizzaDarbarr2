import Link from "next/link";
export default function AdminTabs({isAdmin}) {
    return (
        <div className='flex gap-2 tabs justify-center'>
                <Link className='active' href={'/profile'}>Profile</Link>
                {isAdmin && (
                    <>
                        <Link href={'/categories'}>Categories</Link>
                        <Link href={'/menu-items'}>Menu Items</Link>
                        <Link href={'/users'}>Users</Link>
                    </>
                )}
            </div>
    );
}