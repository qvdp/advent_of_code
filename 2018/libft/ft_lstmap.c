/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_lstmap.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: qvan-der <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/19 12:56:46 by qvan-der          #+#    #+#             */
/*   Updated: 2018/11/19 16:34:44 by qvan-der         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"
#include <stdlib.h>

static void	ft_lstaddatend(t_list *alst, t_list *new)
{
	if (alst && new)
	{
		new->next = NULL;
		while (alst->next)
			alst = alst->next;
		alst->next = new;
	}
}

t_list		*ft_lstmap(t_list *lst, t_list *(*f)(t_list *elem))
{
	t_list	*begin;
	t_list	*new;

	if (lst && f)
	{
		if (!(begin = (t_list*)malloc(sizeof(t_list))))
			return (NULL);
		begin = (*f)(lst);
		begin->next = NULL;
		lst = lst->next;
		while (lst)
		{
			if (!(new = (t_list*)malloc(sizeof(t_list))))
				return (NULL);
			new = (*f)(lst);
			ft_lstaddatend(begin, new);
			lst = lst->next;
		}
		return (begin);
	}
	return (NULL);
}
