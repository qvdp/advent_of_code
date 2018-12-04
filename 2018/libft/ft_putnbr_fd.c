/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_putnbr_fd.c                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: qvan-der <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/13 12:15:11 by qvan-der          #+#    #+#             */
/*   Updated: 2018/11/13 12:16:14 by qvan-der         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

void	ft_putnbr_fd(int n, int fd)
{
	unsigned int abs;

	if (n < 0)
	{
		ft_putchar_fd('-', fd);
		abs = n * -1;
	}
	else
		abs = n;
	if (abs > 9)
		ft_putnbr_fd(abs / 10, fd);
	ft_putchar_fd(abs % 10 + '0', fd);
}
