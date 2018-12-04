/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   get_next_line.c                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: qvan-der <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/30 16:51:25 by qvan-der          #+#    #+#             */
/*   Updated: 2018/12/03 14:28:14 by qvan-der         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>
#include "libft.h"

static int			ft_readfd(const int fd, char **str)
{
	int		temp_size;
	char	*tmp;
	char	buff[BUFF_SIZE + 1];


	while ((temp_size = read(fd, buff, BUFF_SIZE)) > 0)
	{
		buff[temp_size] = '\0';
		tmp = ft_strjoin(*str, buff);
		free(*str);
		*str = tmp;
		if (ft_strchr(*str, '\n'))
			break ;
	}
	return (temp_size);
}

static int			ft_build_elem(t_gnl **tmp, t_gnl **alist, char **line, int fd)
{
	int		i;
	char	*str;

	i = 0;
	if ((str = *line))
	{
		while (str[i] && str[i] != '\n')
			i++;
		if ((*line = ft_strsub(str, 0, i)) && *tmp && ((*tmp)->fd == fd))
		{
			if ((ft_strchr(str, '\n')))
				(*tmp)->line = ft_strdup(ft_strchr(str, '\n') + 1);
			else
				(*tmp)->line = ft_strdup("");
		}
		else
		{
			if (!(*tmp = (t_gnl*)malloc(sizeof(t_gnl))))
				return (-1);
			if (ft_strchr(str, '\n'))
				(*tmp)->line = ft_strdup(ft_strchr(str, '\n') + 1);
			else
				(*tmp)->line = ft_strdup("");
			(*tmp)->fd = fd;
			(*tmp)->next = *alist;
			*alist = *tmp;
		}
		free(str);
	}
	return (1);
}

int			ft_get_nline(const int fd, char **line)
{
	static t_gnl	*list = NULL;
	int				size;
	t_gnl			*tmp;

	if (fd < 0 || !line || !BUFF_SIZE || BUFF_SIZE < 1)
		return (-1);
	tmp = list;
	while (tmp && tmp->fd != fd)
		tmp = tmp->next;
	if (tmp && tmp->fd == fd)
	{
		if (!(*line = ft_strdup(tmp->line)))
			return (-1);
	}
	else
	{
		if (!(*line = ft_strdup("")))
			return (-1);
	}
	if ((size = ft_readfd(fd, line)) <= 0 && (!*line || !*line[0]))
		return (size == 0 ? 0 : -1);
	return (ft_build_elem(&tmp, &list, line, fd));
}
