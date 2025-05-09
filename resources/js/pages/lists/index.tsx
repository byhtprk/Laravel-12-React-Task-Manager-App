import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { CheckCircle2, Pencil, Plus, Trash2, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import InputError from '@/components/input-error';

interface List {
    id: number;
    title: string;
    description: string | null;
    tasks_count?: number;
}

interface Props {
    lists: List[];
    flash?: {
        success?: string;
        error?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Lists',
        href: '/lists',
    },
];

export default function ListsIndex({ lists, flash }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingList, setEditingList] = useState<List | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');

    useEffect(() => {
        if (flash?.success) {
            setToastMessage(flash.success);
            setToastType('success');
            setShowToast(true);
        } else if (flash?.error) {
            setToastMessage(flash.error);
            setToastType('error');
            setShowToast(true);
        }
    }, [flash]);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    const {
        data,
        setData,
        post,
        put,
        processing,
        reset,
        errors,
        delete: destroy,
    } = useForm({
        title: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editingList) {
            put(route('lists.update', editingList.id), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                    setEditingList(null);
                },
            });
        } else {
            post(route('lists.store'), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
            });
        }
    };

    const handleEdit = (list: List) => {
        setEditingList(list);
        setData({
            title: list.title,
            description: list.description || '',
        });
        setIsOpen(true);
    };

    const handleDelete = (listId: number) => {
        destroy(route('lists.destroy', listId));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lists" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {showToast && (
                    <div
                        className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg p-4 shadow-lg ${
                            toastType === 'success' ? 'bg-green-500' : 'bg-red-500'
                        } animate-in fade-in slide-in-from-top-5 text-white`}
                    >
                        {toastType === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                        <span>{toastMessage}</span>{' '}
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Lists</h1>{' '}
                    <Dialog open={isOpen} onOpenChange={(open) => {
                        setIsOpen(open);
                        if (!open) {
                            setEditingList(null);
                            reset();
                        }
                    }}>
                        <Button onClick={() => setIsOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            New List
                        </Button>{' '}

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{editingList ? 'Edit List' : 'Create New List'}</DialogTitle>{' '}
                            </DialogHeader>{' '}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>{' '}
                                    <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} required />
                                    <InputError message={errors.title} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>{' '}
                                    <Textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                                    <InputError message={errors.description} />
                                </div>{' '}
                                <Button type="submit" disabled={processing}>
                                    {editingList ? 'Update' : 'Create'}
                                </Button>{' '}
                            </form>{' '}
                        </DialogContent>{' '}
                    </Dialog>{' '}
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {lists.map((list) => (
                        <Card key={list.id} className="hover:bg-accent/50 transition-colors">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-lg font-medium">{list.title}</CardTitle>{' '}
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(list)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>{' '}
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDelete(list.id)}
                                        className="text-destructive hover:text-destructive/90"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardHeader>{' '}
                            <CardContent>
                                <p className="text-muted-foreground text-sm">{list.description || 'No description'}</p>
                                {list.tasks_count !== undefined && <p className="text-muted-foreground mt-2 text-sm">{list.tasks_count} Tasks </p>}
                            </CardContent>{' '}
                        </Card>
                    ))}
                </div>
            </div>{' '}
        </AppLayout>
    );
}
