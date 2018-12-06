#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>
#include "header.h"
#include "libft.h"

static int 		ft_search_intact_whouse(char **map, t_whouse **list)
{
	t_whouse *tmp_lst;
	char **tmp_map;
	int is_ok;
	int i;
	int j;

	tmp_lst = (*list);
	if (map && tmp_lst)
	{
		while (tmp_lst)
		{
			i = -1;
			tmp_map = map;
			is_ok = 1;
			while (tmp_map[++i])
			{
				j = 0;
				while (tmp_map[i][j] && is_ok == 1)
				{
					if (j >= tmp_lst->start_x && j < (tmp_lst->start_x + tmp_lst->size_x) &&
							(i >= tmp_lst->start_y && i < (tmp_lst->start_y + tmp_lst->size_y)))
					{
						if (tmp_map[i][j] - 1 != '0')
							is_ok = 0;
					}
					j++;
				}
			}
			if (is_ok == 1)
				return (tmp_lst->id);
			tmp_lst = tmp_lst->next;
		}
	}
	return (0);
}

static void 	ft_fill_map(char **map, t_whouse **list)
{
	t_whouse *tmp_lst;
	int i;
	int j;

	tmp_lst = (*list);
	if (map && tmp_lst)
	{
		while (tmp_lst)
		{
			i = -1;
			while (map[++i])
			{
				j = -1;
				while (map[i][++j])
				{
					if (j >= tmp_lst->start_x && j < (tmp_lst->start_x + tmp_lst->size_x) &&
							(i >= tmp_lst->start_y && i < (tmp_lst->start_y + tmp_lst->size_y)))
							map[i][j]++;
				}
			}
			tmp_lst = tmp_lst->next;
		}
	}
}

static char **ft_build_map(t_whouse **list, float sqre_size)
{
	int		i;
	char	**tab;

	(void)list;
	if (!(tab = (char**)malloc(sizeof(char*) * (GET_Y(sqre_size) + 1))))
		return (NULL);
	i = -1;
	while (++i <= GET_Y(sqre_size))
	{
		tab[i] = ft_strnew(GET_X(sqre_size));
		ft_strfill(tab[i], '0', GET_X(sqre_size));
	}
	tab[i] = NULL;
	return (tab);
}

static float  ft_get_square_size(t_whouse **list)
{
	int max_x;
	int max_y;
	float max;
	t_whouse 	*tmp_list;

	max = 0;
	max_x = 0;
	max_y = 0;
	tmp_list = (*list);
	while (tmp_list)
	{
		if (max_x < (tmp_list->start_x + tmp_list->size_x))
			max_x = tmp_list->start_x + tmp_list->size_x;
		if (max_y < (tmp_list->start_y + tmp_list->size_y))
			max_y = tmp_list->start_y + tmp_list->size_y;
		tmp_list = tmp_list->next;
	}
	max = SET_X(max_x) + SET_Y(max_y);
	return (max);
}

static int	ft_build_list(t_whouse **list, char **line)
{
	int i;
	char *claim;
	t_whouse 	*element;
	t_whouse 	*tmp_list;

	claim = (*line);
	if (claim)
	{
		// Go to the end of the list
		tmp_list = (*list);
		while (tmp_list && tmp_list->next)
			tmp_list = tmp_list->next;
		// Build a new warehouse
		i = 0;
		if ((element = (t_whouse*)malloc(sizeof(t_whouse))))
		{
			element->id = ft_atoi(claim + 1);
			while (*claim != '@')
				claim++;
			element->start_x = ft_atoi(claim + 1);
			while (*claim != ',')
				claim++;
			element->start_y = ft_atoi(claim + 1);
			while (*claim != ':')
				claim++;
			element->size_x = ft_atoi(claim + 1);
			while (*claim != 'x')
				claim++;
			element->size_y = ft_atoi(claim + 1);
			element->next = NULL;
		}
		else
			return (0);
		if (tmp_list)
			tmp_list->next = element;
		else
			(*list) = element;
	}
	return (1);
}

int	main(void)
{
	int 			fd;
	char 			*line;
	t_whouse 	*list;
	char 			**map;

	list = NULL;
	fd = open("puzzle", O_RDONLY);
	while (ft_get_nline(fd, &line))
	{
		if (!(ft_build_list(&list, &line)))
			return (-1);
		ft_strdel(&line);
	}
	close(fd);

	// Build a map at the right size and fill it with 0 and then add 1 when
	// a warehouse is placed
	map = ft_build_map(&list, ft_get_square_size(&list));
	ft_fill_map(map, &list);

	// Search for intact whouse (square == 1)
	ft_putnbr(ft_search_intact_whouse(map, &list));
	return (0);
}
