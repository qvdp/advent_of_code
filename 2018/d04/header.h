#ifndef HEADER_H
# define HEADER_H

typedef struct		s_guard
{
	int						 	timestamp;
	char 						*dtime;
	char 						*str;
	int 						state; // 0 - Begins shift, 1 - awake, 2 - asleep
	int 						id;
	struct s_guard	*next;
}									t_guard;

typedef struct		s_report
{
	int 						id;
	int						 	asleep_tot;
	int 						*timesheet;
	struct s_report	*next;
}									t_report;

#endif
