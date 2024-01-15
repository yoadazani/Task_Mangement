import {Dispatch, SetStateAction} from 'react';
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {ColorPicker} from "@/components/shared/ColorPicker";
import {Button} from "@/components/ui/button";
import {boardsSchema} from "@/constant/pages/boards/boardsConstant";

import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {colors} from "@/data/colors";
import {useBoards} from "@/stores/boards";
import {useParams} from "next/navigation";

export const CreateBoardForm = ({setIsOpen}: { setIsOpen: Dispatch<SetStateAction<boolean>> }) => {
    const params = useParams()
    const boardStore = useBoards()
    const form = useForm<z.infer<typeof boardsSchema>>({
        resolver: zodResolver(boardsSchema),
        defaultValues: {
            name: "",
            description: "",
            color: colors[0].split("-")[1] || "",
        },
    })

    const createBoard = async (data: z.infer<typeof boardsSchema>) => {
        await boardStore.createBoard(
            params.workspaceId as string,
            data.name,
            data.description,
            data.color
        )

        setIsOpen(false)
    }

    return (
        <Form {...form}>
            <form
                className="flex flex-col space-y-4"
                onSubmit={form.handleSubmit(createBoard)}
            >
                <FormField
                    name="name"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <Label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                                Board name
                            </Label>
                            <FormControl>
                                <div
                                    className="flex items-center gap-x-2 border rounded-lg focus-within:shadow-md  p-1 px-2">
                                    <Input
                                        type="text"
                                        placeholder="Enter board name"
                                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    name="description"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <Label
                                className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Description</Label>
                            <FormControl>
                                <div
                                    className="flex items-center gap-x-2 border rounded-lg focus-within:shadow-md  p-1 px-2">
                                    <Textarea
                                        rows={4}
                                        placeholder="Enter board description"
                                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent resize-none"
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    name="color"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <ColorPicker onChangeField={field.onChange}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button
                    variant="premium"
                    type="submit"
                >
                    Create Board
                </Button>
            </form>
        </Form>
    );
};