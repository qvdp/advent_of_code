#include "header.h"
#include "libft.h"
#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>
#include <time.h>

static int	ft_get_timestamp(char **log)
{
	struct tm info;

	info.tm_year = ft_atoi(ft_strsub(*log, 1, 4)) + 500 - 1900; // Set at 2018 for convinence
	info.tm_mon = ft_atoi(ft_strsub(*log, 6, 2)) - 1;
	info.tm_mday = ft_atoi(ft_strsub(*log, 9, 2)) + 1;
	info.tm_hour = ft_atoi(ft_strsub(*log, 12, 2));
	info.tm_min = ft_atoi(ft_strsub(*log, 15, 2));
	info.tm_sec = 0;
	info.tm_isdst = 0;
	return (mktime(&info));
}

static int	ft_build_list(t_guard **list, char **line)
{
	char 			*log;
	t_guard 	*element;
	t_guard 	*tmp_list;

	log = (*line);
	if (log)
	{
		// Go to the end of the list
		tmp_list = (*list);
		while (tmp_list && tmp_list->next)
			tmp_list = tmp_list->next;
		// Build a log on puzzle input line
		if ((element = (t_guard*)malloc(sizeof(t_guard))))
		{
			element->timestamp = ft_get_timestamp(&log);
			element->str = ft_strdup(ft_strchr(log, ']') + 2);
			element->dtime =ft_strsub(log, 15, 2);
			element->state = 0;
			element->id = 0;
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

static int	ft_filter_list(t_guard **list)
{
	int 			ref;
	int				old_min;
	char 			*old_dtime;
	t_guard 	*l;
	t_guard 	*tmp_list2;
	char 			*old_sentence;

	if (*list)
	{
		l = (*list);
		while(l->next)
		{
			ref = l->timestamp; // Set ref as first element of the chain
			tmp_list2 = l;
			while(tmp_list2) // Loop in a copy of the list
			{
				if(tmp_list2->timestamp < ref) // Until a lower ref is found - Here we do the trick
				{
					old_min = ref;
					old_sentence = l->str;
					old_dtime = l->dtime;
					l->timestamp = tmp_list2->timestamp;
					l->str = tmp_list2->str;
					l->dtime = tmp_list2->dtime;
					tmp_list2->timestamp = old_min;
					tmp_list2->str = old_sentence;
					tmp_list2->dtime = old_dtime;
					ref = l->timestamp; // Set as new ref
				}
				tmp_list2 = tmp_list2->next;
			}
			l = l->next;
		}
		return (1);
	}
	return (0);
}

static int	ft_complete_list(t_guard **list)
{
	t_guard 	*lst;

	if (*list)
	{
		lst = (*list);
		while(lst)
		{
			lst->id = (ft_strchr(lst->str, '#')) ? ft_atoi(ft_strchr(lst->str, '#') + 1) : 0;
			lst->state = (lst->str[0] == 'G') ? 0 : ((lst->str[0] == 'w') ? 1 : ((lst->str[0] == 'f') ? 2 : 0));
			lst = lst->next;
		}
	}
	return 1;
}

static int	ft_sum_asleep_time(t_guard **list)
{
	int count;

	count = 0;
	while ((*list) && (*list)->next && (*list)->next->next && !ft_strchr((*list)->next->str, '#'))
	{
		count += ((*list)->next->next->timestamp - (*list)->next->timestamp);
		(*list) = (*list)->next->next;
	}
	return (count/60);
}

static int	*ft_build_timesheet(t_guard **list, int id)
{
	int 	*timesheet;
	t_guard *tmp_list;
	int 	time;
	int   time2;
	int 	i;

	if ((timesheet = (int*)malloc(sizeof(int) * 60)))
	{
		tmp_list = (*list);
		while (tmp_list) // Loop until the next shift of the lazy guard
		{
			if (tmp_list->id == id)
			{
				tmp_list = tmp_list->next;
				while (tmp_list && tmp_list->id == 0)
				{
					if (tmp_list->state == 2)
					{
						i = -1;
						time = ft_atoi(tmp_list->dtime);
						time2 = ft_atoi(tmp_list->next->dtime);
						while (++i < (time2 - time))
							timesheet[time + i] += 1;
					}
					tmp_list = tmp_list->next;
				}
			}
			else
				tmp_list = tmp_list->next;
		}
		return (timesheet);
	}
	return (NULL);

}

static int	ft_build_report(t_guard **list, t_report **report)
{
	t_report 	*element;
	t_guard 	*tmp_list;
	t_report 	*tmp_report;

	if (list)
	{
		tmp_list = (*list);
		while (tmp_list)
		{
			tmp_report = (*report);
			while(tmp_report && tmp_report->id != tmp_list->id)
				tmp_report = tmp_report->next;
			if (tmp_list->id != 0 && (!tmp_report || tmp_report->id != tmp_list->id))
			{
				if (!(element = (t_report*)malloc(sizeof(t_report))))
					return (0);
				element->id = tmp_list->id;
				element->timesheet = ft_build_timesheet(&(*list), element->id);
				element->asleep_tot = ft_sum_asleep_time(&tmp_list);
				element->next = NULL;
				if ((*report))
					element->next = (*report);
				(*report) = element;
			}
			else if (tmp_report && tmp_report->id == tmp_list->id)
				tmp_report->asleep_tot += ft_sum_asleep_time(&tmp_list);
			tmp_list = tmp_list->next;
		}
	}
	return (1);
}

static int ft_search_sleepestminute(t_report **report)
{
	t_report 	*tmp_report;
	int 			i;
	int				ref;
	int				sleepest_minute;
	int 			reccurent_sleeper_id;

	tmp_report = *(report);
	ref = 0;
	while (tmp_report)
	{
		i = -1;
		while (++i < 60)
		{
			if (tmp_report->timesheet[i] > ref)
			{
				ref = tmp_report->timesheet[i];
				sleepest_minute = i;
				reccurent_sleeper_id = tmp_report->id;
			}
		}
		tmp_report = tmp_report->next;
	}
	return (reccurent_sleeper_id * sleepest_minute);
}

int	main (void)
{
	int 			fd;
 	char 			*line;
 	t_guard 	*list;
	t_report 	*report;

	// First, we build a list on all records of the puzzle
 	list = NULL;
 	fd = open("puzzle", O_RDONLY);
 	while (ft_get_nline(fd, &line))
 	{
 		if (!(ft_build_list(&list, &line)))
 			return (-1);
 		ft_strdel(&line);
 	}
	close(fd);

	// Then we filter this list thanks to the built timestamp
	ft_filter_list(&list);

	// Then we complete this list with ID and state at the corresponding time
	ft_complete_list(&list);

	// Then we build from this list a list of unical guard whith an associeted asleep time counter and timesheet
	ft_build_report(&list, &report); 	// So far from here, we have a timesheet for each unical guard.

	// Then we need to find in each timetable, which minute is the most asleep
	ft_putnbr(ft_search_sleepestminute(&report));
	ft_putendl("");
	return(0);
}
