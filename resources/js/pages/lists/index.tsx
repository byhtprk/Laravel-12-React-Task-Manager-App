import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import appLayout from '@/layouts/app-layout';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { useState, useEffect, use } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';

interface List {
    id: number;
    flash?:{
        success?: string;
        error?: string;
    };
}

interface Props {
    lists: List[];
    flash?:{
        success?: string;
        error?: string;
    };
}

const breadcrumbs: Breadcrumb[] = [
    {
        title: 'Lists',
        href: '/lists',
    },
];

export default function Index({ lists, flash }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingList, setEditingList] = useState<List | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMesage, setToastMessage] = useState('');
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
    }
    , [flash]);

    useEffect(() => {
        if(showToast){
            const timer = setTimeout(() => {
                setShowToast(false)
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    const { data, setData, post, put, processing, reset, delete: destroy } = useForm({
        title: '',
        description: '',

    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(editingList){
            put(route('list.update', editingList.id), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                    setEditingList(null);
                },
            });
        }else{
            post(route('list.store'), {
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
        destroy(route('list.destroy', listId));
    };

};
